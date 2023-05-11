import { ChangeEvent, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Select, SelectOption } from "ui/Select/Select";
import { setCurrentSeason } from "../../store/leagues-slice";
import { fetchLeagues } from "../../store/leagues-thunk";

export const SeasonsSelect = () => {
  const { availableSeasons, currentSeason } = useAppSelector(
    ({ leagues }) => leagues
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLeagues());
  }, []);

  if (availableSeasons && currentSeason) {
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
        name="seasons"
        optList={optList}
        selected={currentSeason.toString()}
        onChange={handleChange}
      />
    );
  }

  return <Select name="seasons" disabled={true} />;
};
