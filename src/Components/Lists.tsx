import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Lists() {
  const [error, setError] = useState(false);
  const [selected, useSelected] = useState("NL");
  const { data, isLoading } = useQuery({
    queryKey: ["LangList"],
    queryFn: async () => {
      const response = await fetch(`https://openholidaysapi.org/countries`);
      if (!response.ok) {
        setError(true);
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
  });
  let DateNow = new Date();

  const HolidaysList = useQuery({
    queryKey: ["HolidaysList"],
    queryFn: async () => {
      const response = await fetch(
        `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selected}&validFrom=${DateNow.getFullYear()}-01-01&validTo=${DateNow.getFullYear()}-12-31&languageIsoCode=EN`
      );
      if (!response.ok) {
        setError(true);
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
  });
  const HolidaysListData = HolidaysList?.data;

  return (
    <>
    <div className=" flex flex-col justify-center text-2xl  items-center ">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="text-4xl">
          {data ? (
            <select
              required
              defaultValue="NL"
              onChange={(e) => {
                useSelected(e.target.value);
                HolidaysList.refetch();
              }}
            >
              {data.map((lang: any, index: number) => (
                <option key={index} value={lang.isoCode}>
                  {lang.name[0].text}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      )}
      {error ?  <p>Something went wrong</p> :
     <>
      {HolidaysList.isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {HolidaysListData ? (
            <div className="w-[90%] max-w-3xl h-[400px] overflow-y-auto bg-white shadow-lg rounded-xl p-4">
              {HolidaysListData.map((Holiday: any, index: number) => (
                <p
                  key={index}
                >{`Holiday: ${Holiday.name[0].text}  :  ${Holiday.startDate}`}</p>
              ))}
            </div>
          ) : null}
        </div>
      )}
      </>
      }
      
    </div>
    </>
  );
}
