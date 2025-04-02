import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <Container>
      <h1 className="text-2xl font-semibold">Tapiceria Confort</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quaerat
        distinctio alias, eos iure dolorem, quisquam nostrum facere incidunt
        natus, exercitationem debitis. Molestias nihil obcaecati deleniti,
        fugavoluptate amet assumenda.
      </p>
      <Button size="lg">Check Out</Button>
    </Container>
  );
};

export default page;
