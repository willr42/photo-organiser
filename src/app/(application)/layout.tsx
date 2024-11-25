export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <nav>
        <ul className="mx-auto flex">
          <li>Something</li>
        </ul>
      </nav>
      {children}
    </div>
  )
}
