// import { Drawer, SxProps, Theme } from "@mui/material";
// import TooltipComponent from "./TooltipComponent";
// import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import { useState } from "react";
// import CollapseComponent from "./CollapseComponent";
// import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
// import { useUser } from "@/context/UserContext";

// const listItemStyles = {
//   color: "var(--primary)",
//   cursor: "pointer",
//   gap: "0.5rem",
//   transition: "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
//   "&:hover": {
//     backgroundColor: "var(--black-3)",
//     transform: "scale(1.02)",
//   },
//   "&:active": {
//     backgroundColor: "var(--black-3)",
//     transform: "scale(0.98)",
//   },
//   marginTop: "0.7rem",
// };

// const listItemTextStyles = {
//   padding: "0 !important",
//   margin: "0 !important",
//   "& .MuiTypography-root": {
//     padding: "0 !important",
//     margin: "0 !important",
//   },
//   "& .MuiListItemText-primary": {
//     fontSize: "1rem",
//     fontWeight: "700",
//   },
// };

// interface SidebarProps {
//   styles?: SxProps<Theme>;
// }

// const Sidebar = ({ styles }: SidebarProps) => {
//   const [open, setOpen] = useState<boolean>(false);
//   const { user } = useUser();

//   return (
//     <Drawer sx={styles} variant="permanent">
//       <TooltipComponent
//         primary="Home"
//         icon={<HomeRoundedIcon />}
//         open={open}
//         setOpen={setOpen}
//         listItemStyles={listItemStyles}
//         listItemTextStyles={listItemTextStyles}
//       />

//       <TooltipComponent
//         primary="Notícias"
//         icon={<ArticleRoundedIcon />}
//         open={open}
//         setOpen={setOpen}
//         listItemStyles={listItemStyles}
//         listItemTextStyles={listItemTextStyles}
//       />

//       <CollapseComponent   user={user ? { is_admin: user.is_admin ?? false } : { is_admin: false }} open={open} openStates={{}} />
//     </Drawer>
//   );
// };
