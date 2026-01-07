import DebugSection from "./DebugSection";

export default function PSPDebugBlock({ form }: { form: any }) {
  return (
    <DebugSection
      title="PSPInputProfile（debug）"
      description="實際送進 PSP_compute 的原始結構"
    >
      <pre className="text-[11px] leading-snug max-h-64 overflow-auto">
        {JSON.stringify(form, null, 2)}
      </pre>
    </DebugSection>
  );
}