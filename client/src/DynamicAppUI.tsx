import React from "react";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";

interface Entity {
  name: string;
  fields: string[];
}

interface DynamicAppUIProps {
  appName: string;
  entities: Entity[];
  roles: string[];
  features: string[];
}

const DynamicAppUI: React.FC<DynamicAppUIProps> = ({
  appName,
  entities,
  roles,
  features,
}) => {
  const [tab, setTab] = React.useState(0);

  return (
    <Paper sx={{ mt: 4, p: 3, borderRadius: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        {appName} - Mock UI
      </Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        {roles.map((role) => (
          <Tab key={role} label={role} />
        ))}
      </Tabs>
      <Box>
        {entities.map((entity) => (
          <Paper
            key={entity.name}
            sx={{ mb: 3, p: 2, bgcolor: "background.default" }}
          >
            <Typography variant="h6" color="secondary" gutterBottom>
              {entity.name} Form
            </Typography>
            <Box component="form">
              {entity.fields.map((field) => (
                <Box key={field} sx={{ mb: 2 }}>
                  <Typography>{field}:</Typography>
                  {/* Input field mock */}
                  <input
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                    disabled
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Features: {features.join(", ")}
      </Typography>
    </Paper>
  );
};

export default DynamicAppUI;
