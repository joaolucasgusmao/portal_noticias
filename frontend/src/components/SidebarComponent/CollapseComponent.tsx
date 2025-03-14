// import {
//   Collapse,
//   List,
//   ListItem,
//   ListItemText,
//   SxProps,
//   Theme,
// } from "@mui/material";

// interface CollapseComponentProps {
//   open: boolean;

//   openStates: Record<string, boolean>;
//   setOpenStates: (key: string) => void;

//   itemKey: string;

//   stylesCollapse?: SxProps<Theme>;

//   user: { is_admin: boolean };

//   items: { label: string; isAdminOnly?: boolean }[];
// }

// const CollapseComponent = ({
//   open,
//   openStates,
//   setOpenStates,
//   stylesCollapse,
//   itemKey,
//   user,
//   items,
// }: CollapseComponentProps) => {
//   return (
//     <Collapse in={openStates[itemKey] && open} timeout="auto" unmountOnExit>
//       <List component="div" disablePadding>
//         {items.map((item, index) =>
//           user?.is_admin ? (
//             <ListItem
//               component="button"
//               onClick={() => setOpenStates(itemKey)}
//               sx={stylesCollapse}
//               key={index}
//             >
//               <ListItemText primary={item.label} />
//             </ListItem>
//           ) : null
//         )}
//       </List>
//     </Collapse>
//   );
// };

// export default CollapseComponent;
