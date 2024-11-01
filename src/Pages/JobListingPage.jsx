import { getComapanies } from "@/api/apiComapny";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UseFetch from "@/hooks/UseFetch";
import { useUser } from "@clerk/clerk-react";
import { Country } from "country-state-city";
import { useEffect, useState } from "react";
import { SpinnerCircularSplit } from "spinners-react";
import { Skeleton } from "@/components/ui/skeleton";

const JobListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = UseFetch(getJobs, {
    searchQuery,
    location,
    company_id,
  });

  const { isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, searchQuery, location, company_id]);

  const { fn: fnCompanies, data: companiesData } = UseFetch(getComapanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <SpinnerCircularSplit
        className="m-auto"
        size={150}
        thickness={179}
        speed={115}
        color="green"
        secondaryColor="grey"
      />
    );
  }

  const handelSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) {
      setSearchQuery(query);
    }
  };

  const clearFilter = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  return (
    <div className="ml-[5%]">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        latest job
      </h1>

      <form
        onSubmit={handelSearch}
        className="h-12 flex w-full gap-2 items-center mb-3
      "
      >
        <Input
          type="text"
          placeholder="Search Job by Title"
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button
          type="submit"
          className="h-full sm:w-28 text-2xl"
          variant="capeTwo"
        >
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Country.getAllCountries().map(({ name }) => (
                <SelectItem value={name} key={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {companiesData && companiesData.length > 0 ? (
          <Select
            value={company_id}
            onValueChange={(value) => setCompany_id(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="filter by company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companiesData.map(({ name, id }) => (
                  <SelectItem value={id} key={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <Skeleton />
        )}

        <Button
          onClick={clearFilter}
          variant="destructive"
          className="sm:w-1/2"
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <SpinnerCircularSplit
          className="mt-4 m-auto"
          size={100}
          thickness={179}
          speed={100}
          color="green"
          secondaryColor="grey"
        />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {dataJobs?.length ? (
            dataJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedJob={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div> No jobs found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListingPage;
