import PSPDebugBlock from "./PSPDebugBlock";

export default function MBRIDebugPanel({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <PSPDebugBlock form={form} />
    </div>
  );
}