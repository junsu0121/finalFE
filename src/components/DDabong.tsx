import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { getCookie } from "../shared/cookie";
import React, { useState } from "react";

export const DDabong = () => {
  const userId = getCookie("userId");
  const [heart, setHeart] = useState(false);
  return (
    <div>
      <HeartOutlined style={{ fontSize: "30px" }} />
    </div>
  );
};
