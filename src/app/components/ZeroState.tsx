'use client'
import React from "react";
import { Card, CardBody, Text } from "@chakra-ui/react";
// import svg from "../images/zerostate.svg";

const ZeroState = () => {
  return (
    <div>
      <Card variant={"outline"} className="text-center">
        <CardBody>
          <div className="mb-3">
            {/* <img src={svg} style={{ height: "100px", display: "inline-block" }} /> */}
            No
          </div>
          <Text as={"b"} fontSize={"2xl"}>
            No Documents Found!
          </Text>
          <Text>Please search something else.</Text>
        </CardBody>
      </Card>
    </div>
  );
};

export default ZeroState;
