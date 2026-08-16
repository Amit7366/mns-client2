export function AuthField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-medium text-white">{label}</span>
      {children}
    </label>
  );
}

export function authInputClass(focused?: boolean) {
  return `focus-ring w-full rounded-md border bg-[var(--surface)] px-3 py-3 text-[15px] text-white placeholder:text-[var(--text-muted)] ${
    focused ? "border-[var(--cyan)]" : "border-[var(--border)] focus:border-[var(--cyan)]"
  }`;
}
