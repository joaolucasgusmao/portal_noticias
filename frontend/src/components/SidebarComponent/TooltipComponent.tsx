// import { ListItem, ListItemText, SxProps, Theme } from "@mui/material";
// import { ReactNode } from "react";
// import { Tooltip } from "@mui/material";

// interface TooltipComponentProps {
//   open: boolean;
//   setOpen: (value: boolean) => void;

//   listItemStyles?: SxProps<Theme>;
//   listItemTextStyles?: SxProps<Theme>;

//   icon: ReactNode;
//   primary: string;
// }

// const TooltipComponent = ({
//   open,
//   setOpen,
//   listItemStyles,
//   listItemTextStyles,
//   icon,
//   primary,
// }: TooltipComponentProps) => {
//   return (
//     <Tooltip title="" placement="right" disableHoverListener={open}>
//       <ListItem component="button" sx={listItemStyles}>
//         <span onClick={() => setOpen(true)}>{icon}</span>
//         {open && <ListItemText primary={primary} sx={listItemTextStyles} />}
//       </ListItem>
//     </Tooltip>
//   );
// };

// export default TooltipComponent;
