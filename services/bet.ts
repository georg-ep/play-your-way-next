import { useBetStore } from "@/stores/bet";
import { apiMyBets, apiOpenBets } from "@/api/bet";
import { Bet } from "@/app/page";


export const betServices = () => {
    const { openBets, myBets, setMyBets, setOpenBets } = useBetStore();

    const fetchOpenBets = async (): Promise<Bet[]> => {
      try {
        let bets = openBets;
        if (!bets) {
          bets = await apiOpenBets();
          setOpenBets(bets);
        }
        return bets;
      } catch (e) {
        throw new Error('Error fetching open bets');
      }
    };

    const fetchMyBets = async (): Promise<Bet[]> => {
      try {
        let bets = myBets;
        if (!bets) {
          bets = await apiMyBets();
          setMyBets(bets);
        }
        return bets;
      } catch (e) {
        throw new Error('Error fetching open bets');
      }
    };

    return { fetchOpenBets, fetchMyBets };
}

