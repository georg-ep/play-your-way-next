import { useState } from "react";
import Modal from "../Modal";
import { Button, Input } from "@nextui-org/react";
import { useUIStore } from "@/stores/ui";
import { placeBet } from "@/api/bet";
import { toast } from "react-toastify";

interface BetRow {
  name: string;
  betType: string;
  items: BetItem[];
}

interface BetItem {
  id: number;
  label: string;
  selected: boolean;
}

interface SelectedBet {
  betType: string;
  value: string | number | object;
}

export default function PlaceBetModal() {
  const { modalData, closeModal } = useUIStore();
  const [amount, setAmount] = useState<string>("");
  const [selectedBets, setSelectedBets] = useState<SelectedBet[]>([]);
  const [rows, setRows] = useState<BetRow[]>([
    {
      name: "To Win",
      betType: "TEAM_TO_WIN",
      items: [
        {
          id: modalData.home_team!.id,
          label: modalData.home_team!.short_name,
          selected: false,
        },
        {
          id: modalData.away_team!.id,
          label: modalData.away_team!.short_name,
          selected: false,
        },
      ],
    },
  ]);

  const handleSubmit = async () => {
    if (!amount || Number(amount) < 1) return;
    if (selectedBets.length > 0) {
      await Promise.all(
        selectedBets.map(async (bet) => {
          await placeBet(
            JSON.stringify({
              match: modalData.id,
              amount,
              bet_type: bet.betType,
              object_id: bet.value,
            })
          );
        })
      );
      closeModal();
      toast.success('Bet placed');
    }
  };

  const select = (rowIndex: number, itemIndex: number) => {
    const newRows = rows.map((row, idx) => {
      if (idx !== rowIndex) return row;
      return {
        ...row,
        items: row.items.map((item, itmIdx) => ({
          ...item,
          id: item.id,
          selected: itmIdx === itemIndex ? !item.selected : false,
        })),
      };
    });

    setRows(newRows);

    const selectedRow = newRows[rowIndex];
    const selectedItem = selectedRow.items[itemIndex];

    if (selectedItem.selected) {
      setSelectedBets((prev) => [
        ...prev.filter((bet) => bet.betType !== selectedRow.betType),
        { betType: selectedRow.betType, value: selectedItem.id },
      ]);
    } else {
      setSelectedBets((prev) =>
        prev.filter((bet) => bet.betType !== selectedRow.betType)
      );
    }
  };

  return (
    <Modal
      title="Place a bet"
      body={
        <>
          <div className="text-lg font-bold text-center mb-3">
            {modalData.competition_name}
          </div>
          <div className="flex items-center justify-center gap-2">
            <div>{modalData.home_team!.short_name}</div>
            <div>vs</div>
            <div>{modalData.away_team!.short_name}</div>
          </div>
          {rows.map((row, index) => (
            <div key={`row_${index}`}>
              <div className="text-center mb-2">{row.name}</div>
              <div className="flex items-center justify-center gap-2">
                {row.items.map((item, itmIdx) => (
                  <Button
                    key={`item_${itmIdx}`}
                    variant={item.selected ? "solid" : "bordered"}
                    color="primary"
                    disableRipple
                    onPress={() => select(index, itmIdx)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          <Input
            value={amount}
            onValueChange={setAmount}
            type="number"
            label="Bet amount"
            required
          />
        </>
      }
      onSubmit={handleSubmit}
    />
  );
}
