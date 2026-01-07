interface PageTitleBlockProps {
  title: string;
  description?: string;
}

export default function PageTitleBlock({ title, description }: PageTitleBlockProps) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>

      {description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          {description}
        </p>
      )}
    </>
  );
}