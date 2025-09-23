import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import DynamicAppUI from "./DynamicAppUI";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

const RequirementInputForm = () => {
  const [input, setInput] = useState("");
  const [requirements, setRequirements] = useState("");
  const [parsed, setParsed] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5050/api/extract-requirements",
        { requirements: input }
      );
      setRequirements(res.data.extracted);
      // Parse requirements (mock parser for demo)
      const lines = res.data.extracted.split("\n");
      let appName = "";
      let entities: any[] = [];
      let roles: string[] = [];
      let features: string[] = [];
      lines.forEach((line: string) => {
        if (line.toLowerCase().includes("app name:")) {
          appName = line.split(":")[1]?.trim();
        } else if (line.toLowerCase().includes("entities:")) {
          entities = line
            .split(":")[1]
            ?.split(",")
            .map((e: string) => ({
              name: e.trim(),
              fields: mockFields(e.trim()),
            }));
        } else if (line.toLowerCase().includes("roles:")) {
          roles = line
            .split(":")[1]
            ?.split(",")
            .map((r: string) => r.trim());
        } else if (line.toLowerCase().includes("features:")) {
          features = line
            .split(":")[1]
            ?.split(",")
            .map((f: string) => f.trim());
        }
      });
      setParsed({ appName, entities, roles, features });
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to extract requirements."
      );
    } finally {
      setLoading(false);
    }
  };

  // Mock fields for demo
  function mockFields(entity: string) {
    switch (entity.toLowerCase()) {
      case "student":
        return ["Name", "Email", "Age"];
      case "course":
        return ["Title", "Code", "Credits"];
      case "grade":
        return ["Student", "Course", "Grade"];
      default:
        return ["Field1", "Field2", "Field3"];
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 6 }}>
        <Paper
          elevation={4}
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 4,
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            Requirement Capture Portal
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              multiline
              rows={6}
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Paste or type requirements here..."
              InputProps={{ style: { color: "#fff" } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Extracting..." : "Submit"}
            </Button>
          </Box>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {requirements && (
            <Paper
              sx={{
                mt: 4,
                p: 2,
                bgcolor: "background.default",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" color="secondary" gutterBottom>
                Extracted Requirements
              </Typography>
              <Typography
                component="pre"
                sx={{ whiteSpace: "pre-wrap", color: "#fff" }}
              >
                {requirements}
              </Typography>
            </Paper>
          )}
          {parsed && (
            <DynamicAppUI
              appName={parsed.appName}
              entities={parsed.entities}
              roles={parsed.roles}
              features={parsed.features}
            />
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default RequirementInputForm;
