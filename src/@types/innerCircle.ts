export interface PlanListItem { text: string; isAvailable: boolean }

export interface InnerCirclePlan {
    icons: string[];
    subscription: string;
    prices: {
      month: number;
      year: number;
    },
    caption: string;
    lists: PlanListItem[];
    labelAction: string;
  }