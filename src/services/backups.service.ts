import { GenericService } from "./generic.service";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";
import { IBackup } from "@/types/backup-interface";

class BackupService extends GenericService<IBackup> {
  constructor() {
    super({ endpoint: "backup" });
  }

  async listBackups() {
    const response = await iAxios.get(`${utils.baseUrl}/backup/list`);
    return response.data;
  }

  async createBackup() {
    const response = await iAxios.post(`${utils.baseUrl}/backup/create`);
    return response.data;
  }

  async restoreBackup(filename: string) {
    const response = await iAxios.post(
      `${utils.baseUrl}/backup/restore`,
      null,
      { params: { filename } }
    );
    return response.data;
  }

  async importBackup(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await iAxios.post(
      `${utils.baseUrl}/backup/import`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  }
}

export const backupService = new BackupService();
