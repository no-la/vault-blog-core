const Tag = ({ children }: { children: string }) => {
  return (
    <p
      style={{
        backgroundColor: "#eef2f6",
        color: "#333",
        borderRadius: "0.5rem",
        padding: "0.3rem 0.6rem",
        fontSize: "0.85rem",
      }}
    >
      {children}
    </p>
  );
};

export default Tag;
