import { ChangeEvent, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Select, SelectOption } from "ui/Select/Select";
import { setCurrentSeason } from "../../store/leagues-slice";

interface SeasonsSelectProps {
  className?: string;
}

export const SeasonsSelect = ({ className }: SeasonsSelectProps) => {
  const { availableSeasons, currentSeason } = useAppSelector(
    ({ leagues }) => leagues
  );
  const dispatch = useAppDispatch();

  const optList = useMemo(
    () =>
      availableSeasons.map(
        ({ year }): SelectOption => ({
          title: `${year} - ${year + 1}`,
          value: year.toString(),
        })
      ),
    [availableSeasons]
  );

  const handleChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrentSeason(+target.value));
  };

  return (
    <Select
      className={className}
      name="seasons"
      optList={optList}
      selected={currentSeason.toString()}
      onChange={handleChange}
    />
  );
};
