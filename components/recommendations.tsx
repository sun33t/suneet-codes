import { PageSection } from "./page-section";
import { RecommendationCard } from "./recommendation-card";

import { RECOMMENDATIONS } from "@/content/recommendations";

export const Recommendations = () => {
  return (
    <PageSection>
      <h1
        className="text-4xl font-semibold tracking-tight sm:text-3xl"
        aria-label="Recommendations section"
      >
        Recommendations
      </h1>
      <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
        <div className="-mt-8 sm:-mx-4 sm:text-[0] md:columns-2 lg:columns-3">
          {RECOMMENDATIONS.map((recommendation) => {
            return (
              <RecommendationCard
                recommendation={recommendation}
                key={recommendation.author.handle}
              />
            );
          })}
        </div>
      </div>
    </PageSection>
  );
};
