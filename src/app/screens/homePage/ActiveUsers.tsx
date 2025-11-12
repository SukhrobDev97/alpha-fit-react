import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";
import { MemberType } from "../../../lib/enums/member.enum";
import { AppRootState } from "../../../lib/types/screen";

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
          <Box className="category-title">Active Users</Box>
          <Stack
            className="cards-frame"
            direction="row"
            spacing={2}
            flexWrap="wrap"
          >
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  const roleLabel =
                    member.memberDesc ||
                    (member.memberType === MemberType.RESTAURANT
                      ? "Partner"
                      : "Active Member");
                  return(
                  <Card
                    key={member._id}
                    variant="outlined"
                    className="card"
                    sx={{ width: 200 }}
                  >
                    <CardOverflow className="card-media">
                      <AspectRatio ratio="1">
                        <div className="card-media-wrapper">
                          <img
                            src={imagePath}
                            alt={member.memberNick}
                            loading="lazy"
                          />
                          <Box className="card-hover-overlay">
                            <Stack
                              direction="row"
                              spacing={1.5}
                              className="social-buttons"
                            >
                              <IconButton size="sm" aria-label="facebook">
                                <FacebookIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="sm" aria-label="twitter">
                                <TwitterIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="sm" aria-label="instagram">
                                <InstagramIcon fontSize="small" />
                              </IconButton>
                            </Stack>
                            <Button
                              variant="solid"
                              size="sm"
                              className="view-profile-btn"
                            >
                              View Profile
                            </Button>
                          </Box>
                        </div>
                      </AspectRatio>
                    </CardOverflow>

                    <CardOverflow variant="soft" className="user-detail">
                      <Stack className="info" spacing={1}>
                        <Typography className="memberNick" textAlign="center">
                          {member.memberNick}
                        </Typography>
                        <Typography
                          className="memberRole"
                          textAlign="center"
                          level="body-sm"
                        >
                          {roleLabel}
                        </Typography>
                      </Stack>
                    </CardOverflow>
                  </Card>
                )
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
