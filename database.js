let Database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    reminders: [
      {
        id: 1,
        title: "abc",
        description: "abcabc",
        completed: false,
        tags: ["Test", "tag", "blah"],
        subtasks: ["doing something", "another thing here"],
        due_date: "2023-01-01",
      },
    ],
    friends:[],
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    reminders: [
      {
        id: 1,
        title: "Johnny's Reminder",
        description: "test friend reminder description",
        completed: false,
        tags: ["t1", "t2", "blah"],
        subtasks: ["sub1", "subtask 2 lorem ipsum"],
        due_date: "2023-01-01",
      },
    ],
    friends:[],
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    reminders: [
      {
        id: 1,
        title: "Jonathon's Reminder",
        description: "test friend reminder description",
        completed: true,
        tags: ["t1", "t2", "blah"],
        subtasks: ["sub1", "subtask 2 lorem ipsum"],
        due_date: "2023-05-10",
      },
    ],
    friends:[],
  },
];

const userModel = {
  findOne: (email) => {
    const user = Database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = Database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = { Database, userModel };
