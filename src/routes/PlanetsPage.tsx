import { BottomPagination, PlanetCard } from "@/components";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContentLayout } from "@/layouts";
import type { IPlanet } from "../interfaces/planets";
import { Stack } from "@mui/material";
import { usePlanets } from "@/hooks/usePlanets";

export const PlanetsPage = () => {
  const rowsPerPage = 10;
  const navigate = useNavigate();
  const { pageNumber } = useParams() as { pageNumber: string };
  const page = +pageNumber;
  const { planets, error, isLoading } = usePlanets(pageNumber);
  const [count, setCount] = useState<number>();

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
    navigate(`/planets/${newPage}`);
  };

  useEffect(() => {
    planets && setCount(+planets.count / rowsPerPage);
  }, [planets]);

  const renderPlanets = useMemo(
    () =>
      planets && (
        <Stack gap={4} direction="row" flexWrap="wrap" justifyContent="center">
          {planets?.results.map((planet: IPlanet, idx: number) => (
            <PlanetCard
              key={planet.name}
              {...planet}
              image={`/planet-${idx}.png`}
            />
          ))}
        </Stack>
      ),
    [planets]
  );

  return (
    <>
      <ContentLayout isLoading={isLoading} error={error} title="Hello Worlds!">
        {renderPlanets}
      </ContentLayout>
      {!error && count && (
        <BottomPagination
          count={count}
          page={page}
          handleChangePage={handleChangePage}
        />
      )}
    </>
  );
};
