import Modal from "../Modal";

export default function EnteredSweepstakeModal() {
  return (
    <Modal
      showActions={false}
      body={
        <div className="flex items-center justify-center flex-col">
          <h3 className="text-center text-3xl font-bold mb-4">Success!</h3>
          <p className="text-center">
            You have successfully entered the sweepstake!
          </p>
        </div>
      }
    />
  );
}
