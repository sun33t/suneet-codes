import { SuspendedRecommendationCardAvatar } from "./recommendation-card-avatar";

import { memo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { truncateText } from "@/lib/utils/truncateText";
import { type Recommendation } from "@/types";

type RecommendationCardProps = {
  recommendation: Recommendation;
};
export const RecommendationCard = memo(
  async ({ recommendation }: RecommendationCardProps) => {
    return (
      <Card className="grow border-none bg-zinc-50 shadow-none dark:bg-zinc-800/50">
        <CardContent className="text-sm">
          <div className="pt-8 sm:inline-block sm:w-full sm:px-4">
            <figure className="text-sm/6">
              <blockquote>
                <p className="h-24">{truncateText(recommendation.body[0])}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <SuspendedRecommendationCardAvatar
                  author={recommendation.author}
                />
                <div>
                  <div className="font-semibold">
                    {recommendation.author.name}
                  </div>
                  <div className="text-muted-foreground">{`@${recommendation.author.handle}`}</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </CardContent>
      </Card>
    );
  }
);

RecommendationCard.displayName = "RecommendationCard";
