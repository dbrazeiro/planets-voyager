import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TypographyOwnProps,
} from "@mui/material";
import { IPlanet } from "@/interfaces/planets";
import { styles } from "./planetCard.styles";

interface planetWithImage extends IPlanet {
  image: string;
}

export const PlanetCard = ({
  name,
  climate,
  diameter,
  gravity,
  population,
  terrain,
  surface_water,
  orbital_period,
  rotation_period,
  image,
}: planetWithImage) => {
  const descriptionProps: TypographyOwnProps = {
    variant: "body2",
    color: "text.secondary",
  };

  return (
    <Card sx={styles.planetCardWrapper}>
      <CardMedia sx={styles.cardMedia} image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography {...descriptionProps}>{`Climate: ${climate}`}</Typography>
        <Typography {...descriptionProps}>
          {`Rotation period: ${rotation_period}`}
        </Typography>
        <Typography {...descriptionProps}>
          {`Orbital period: ${orbital_period}`}
        </Typography>
        <Typography {...descriptionProps}>{`Diameter: ${diameter}`}</Typography>
        <Typography {...descriptionProps}>{`Gravity: ${gravity}`}</Typography>
        <Typography {...descriptionProps}>
          {`Population: ${population}`}
        </Typography>
        <Typography {...descriptionProps}>{`Terrain: ${terrain}`}</Typography>
        <Typography {...descriptionProps}>
          {`Surface water: ${surface_water}`}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};
