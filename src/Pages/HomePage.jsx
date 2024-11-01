import { Link } from "react-router-dom";
import company from "../data/company.json";
import faq from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { BriefcaseBusiness } from "lucide-react";
import { UserRoundSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HomePage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 ml-4">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4 uppercase">
          Find your dream job on{" "}
          <span className="flex items-center gap-2 lg:gap-6">
            <img src="/ProHire.png" className="h-14 sm:h-24 lg:h-32" />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          find the best because you deserve the best as an company or as
          candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Link to="/jobs-listing">
          <Button variant="capeOne" className="h-14">
            <BriefcaseBusiness className="mr-2 h-4 w-4" />
            Search Jobs
          </Button>
        </Link>
        <Link to="/post-jobs">
          <Button variant="capeTwo" className="h-14">
            <UserRoundSearch className="mr-2 h-4 w-4" />
            Recruite Candidates
          </Button>
        </Link>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10 border bg-gradient-to-br from-black via-gray-500 to-white rounded-lg shadow-xl"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {company.map(({ name, id, image }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img src={image} className="h-9 sm:h-14 object-contain" />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>For Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            find jobs, track application, get feedback and more
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Recruiter</CardTitle>
          </CardHeader>
          <CardContent>
            find candidate, manage application, create hiring challenges and
            more
          </CardContent>
        </Card>
      </section>

      <section>
        <Accordion type="single" collapsible>
          {faq.map((faq, i) => {
            return (
              <AccordionItem key={i} value={`item-${i + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </main>
  );
};

export default HomePage;
