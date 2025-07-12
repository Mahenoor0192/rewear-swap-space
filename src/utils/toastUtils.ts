
import { useToast } from '@/hooks/use-toast';

export const showSwapRequestToast = (toast: any, itemTitle: string) => {
  toast({
    title: "Swap Request Sent",
    description: `Your swap request for "${itemTitle}" has been sent successfully!`,
  });
};

export const showSwapRequestReceivedToast = (toast: any, itemTitle: string, userName: string) => {
  toast({
    title: "New Swap Request",
    description: `${userName} wants to swap for your "${itemTitle}"`,
  });
};

export const showSwapAcceptedToast = (toast: any, itemTitle: string) => {
  toast({
    title: "Swap Accepted",
    description: `Your swap request for "${itemTitle}" has been accepted!`,
  });
};

export const showSwapDeclinedToast = (toast: any, itemTitle: string) => {
  toast({
    title: "Swap Declined",
    description: `Your swap request for "${itemTitle}" was declined.`,
    variant: "destructive",
  });
};
