export interface PlanListItem { text: string; isAvailable: boolean }

export interface InnerCirclePlan {
    icons: string[];
    subscription: string;
    prices: {
      month: {
        id: string;
        amount: number
      },
      year: {
        id: string;
        amount: number
      }
    },
    caption: string;
    lists: PlanListItem[];
    labelAction: string;
  }