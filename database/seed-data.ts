interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}
interface SeedData {
  entries: SeedEntry[];
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "pending Et enim ad reprehenderit ad do deserunt tempor commodo et ex ex.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "in-progress Officia aliquip commodo sit do esse ullamco nulla eiusmod eiusmod irure exercitation cupidatat labore.",
      status: "in-progress",
      createdAt: Date.now() - 1000,
    },
    {
      description: "finished In culpa cillum elit eiusmod.",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
