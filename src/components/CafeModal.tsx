import { Coffee, X } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface CafeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CafeModal = ({ open, onOpenChange }: CafeModalProps) => {
  const { toast } = useToast();

  const handleSupport = () => {
    // Simulate payment success
    toast({
      title: "Thank you! ☕",
      description: "Your support means the world. Fueling the next build!",
      duration: 5000,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Coffee className="h-6 w-6 text-primary" />
            Buy Me a Coffee
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-muted-foreground">
            Enjoy the work? Your support helps me keep building, learning, and sharing. 
            A small contribution goes a long way!
          </p>

          <div className="bg-secondary/50 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Support Options</p>
            <div className="space-y-2">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleSupport}
              >
                <Coffee className="mr-2 h-4 w-4" />
                $1 Coffee
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={handleSupport}
              >
                <Coffee className="mr-2 h-4 w-4" />
                $5 Grande
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            💡 Replace with your BuyMeACoffee widget or Stripe payment link
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
