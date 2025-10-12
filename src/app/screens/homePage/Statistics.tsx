import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../../components/divider";


export default function Statistics(){
    return <div className={"statistic-frame"}>
        <Container>
            <Stack className={"info"}>
                <Stack className={"static-box"}>
                    <Box className={"static-num"}>150+</Box>
                    <Box className={"static-text"}>Healthy meals</Box>
                </Stack>

                <Divider height="64" width="2" bg="#E3C08D"/>

                <Stack className={"static-box"}>
                    <Box className={"static-num"}>46</Box>
                    <Box className={"static-text"}>Fitness Programs</Box>
                </Stack>

                <Divider height="64" width="2" bg="#E3C08D"/>

                <Stack className={"static-box"}>
                    <Box className={"static-num"}>30+</Box>
                    <Box className={"static-text"}>Smoothie Options</Box>
                </Stack>

                <Divider height="64" width="2" bg="#E3C08D"/>

                <Stack className={"static-box"}>
                    <Box className={"static-num"}>20k+</Box>
                    <Box className={"static-text"}>Active Clients</Box>
                </Stack>
            </Stack>
        </Container>
    </div>
}