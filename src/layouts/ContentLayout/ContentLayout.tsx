import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styles } from "./contentLayout.styles";

interface ContentLayoutProps {
  title: string;
  isLoading: boolean;
  error: Error;
  children: React.ReactElement;
}

export const ContentLayout = ({
  title,
  children,
  isLoading,
  error,
}: ContentLayoutProps) => {
  const defaultErrorMassage = "An error occurred while fetching the data.";

  if (isLoading) {
    return (
      <Box sx={styles.bottomLoader}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Alert severity="error" sx={{ p: 4 }}>
        <Typography>
          <Stack direction="row" gap="2">
            {error.message || defaultErrorMassage}
            <Link to="/planets/1">Take me back to Home</Link>
          </Stack>
        </Typography>
      </Alert>
    );
  }
  return (
    <Stack p={4} mb={12}>
      <Typography marginBottom={4} component={"h1"} fontSize={40}>
        {title}
      </Typography>
      {children}
    </Stack>
  );
};
