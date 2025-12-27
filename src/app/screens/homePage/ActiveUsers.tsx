import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

/** REDUX SLICE & SELECTOR **/


const topUsersRetriever = createSelector(
  retrieveTopUsers, 
  (topUsers) => ({topUsers})
)

export default function ActiveUsers() {
      const {topUsers} = useSelector(topUsersRetriever)
  

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">
            <span className="title-text">Active Users</span>
            <span className="title-subtitle">Trusted by our healthy community</span>
            <span className="title-accent"></span>
          </Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                    <Card
                      key={member._id}
                      className="premium-user-card"
                    >
                      <CardOverflow className="user-image-container">
                        <Box className="avatar-wrapper">
                          <img
                            src={imagePath}
                            alt={member.memberNick}
                            className="user-image"
                            loading="lazy"
                          />
                        </Box>
                      </CardOverflow>

                      <CardOverflow className="user-detail">
                        <Stack className="user-info" spacing={1.5}>
                          <Typography className="user-name" textAlign="center">
                            {member.memberNick}
                          </Typography>
                          <Box className="active-badge">
                            <span className="badge-dot">●</span>
                            <span className="badge-text">Active Member</span>
                          </Box>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
