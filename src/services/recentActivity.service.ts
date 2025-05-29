import { GenericService } from "./generic.service";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";
import { IRecienActivityDTO } from "@/types/recent-activity-response-interface";

class RecentActivityService extends GenericService<IRecienActivityDTO> {
  constructor() {
    super({ endpoint: "dashboard" });
  }

  async recentActivity() {
    const response = await iAxios.get(
      `${utils.baseUrl}/dashboard/recentActivity`
    );
    return response.data;
  }
}

export const recentActivityService = new RecentActivityService();
