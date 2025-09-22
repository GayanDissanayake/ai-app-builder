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
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to extract requirements."
      );
    } finally {
      setLoading(false);
    }
  };

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
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default RequirementInputForm;
