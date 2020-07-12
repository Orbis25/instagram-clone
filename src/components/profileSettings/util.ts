export const TabsContent: { label: string; index: number }[] = [
  { label: "Edit Profile", index: 0 },
  { label: "Change Password", index: 0 },
];


export function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}


