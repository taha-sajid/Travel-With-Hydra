export default function handler(req, res) {
  const data = [
    {
      id: 1,
      title: "Accordion Item 1",
      description: "This is the description for Accordion Item 1.",
    },
    {
      id: 2,
      title: "Accordion Item 2",
      description: "This is the description for Accordion Item 2.",
    },
    {
      id: 3,
      title: "Accordion Item 3",
      description:
        "This is the description for Accordion Item 3 sad.This is the description for Accordion Item 3 sad.This is the description for Accordion Item 3 sad.This is the description for Accordion Item 3 sad.This is the description for Accordion Item 3 sad.This is the description for Accordion Item 3 sad.This is the description for Accordion Item 3 sad.",
    },
  ];

  res.status(200).json(data);
}
