import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UseFetch from "@/hooks/UseFetch";
import { applyToJobs } from "@/api/apiApplication";
import { Skeleton } from "./ui/skeleton";
import { Button } from "@/components/ui/button";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0 years" })
    .int(),
  skills: z.string().min(1, { message: "skills are required" }),
  education: z.string().min(1, { message: "degree can not be empty" }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "only PDF or word file are allowed" }
    ),
});

const ApplyJobs = ({ user, job, fetchJob, applied = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: applyJobError,
    fn: fnApplyJob,
  } = UseFetch(applyToJobs);

  const onSubmit = (data) => {
    fnApplyJob({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.username,
      resume: data.resume[0],
      status: "applied",
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <div>
      <Drawer open={applied ? false : undefined}>
        <DrawerTrigger>
          <Button
            size="lg"
            variant={job?.isOpen && !applied ? "capeTwo" : "destructive"}
            disabled={!job?.isOpen || applied}
          >
            {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              Apply for {job?.title} at {job?.company?.name}
            </DrawerTitle>
            <DrawerDescription>Fill the job from below</DrawerDescription>
          </DrawerHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-4"
          >
            <Input
              type="number"
              placeholder="year of experience"
              className="flex-1"
              {...register("experience", {
                valueAsNumber: true,
              })}
            />

            {errors.experience && (
              <p className="text-red-500">{errors.experience.message}</p>
            )}

            <Input
              type="text"
              placeholder="Skills (comma seprated)"
              className="flex-1"
              {...register("skills", {
                required: true,
              })}
            />

            {errors.skills && (
              <p className="text-red-500">{errors.skills.message}</p>
            )}

            <Input
              type="text"
              placeholder="Educational Degree [ex- B.tech]"
              className="flex-1"
              {...register("education", {
                required: true,
              })}
            />

            {errors.education && (
              <p className="text-red-500">{errors.education.message}</p>
            )}

            <Input
              type="file"
              accept=".pdf, .doc, .docx"
              className="flex-1 file:text-cape-cod-300 file:outline-double"
              {...register("resume", {
                required: true,
              })}
            />

            {errors.resume && (
              <p className="text-red-500">{errors.resume.message}</p>
            )}

            {applyJobError?.resume && (
              <p className="text-red-500">{applyJobError?.resume.message}</p>
            )}

            {loadingApply && <Skeleton className="w-[100%] h-[20px]" />}
            <Button type="submit" variant="capeOne" size="lg">
              Submit
            </Button>
          </form>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ApplyJobs;
