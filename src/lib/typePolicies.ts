import { TypePolicies } from "@apollo/client"

const typePolicies: TypePolicies = {
  User: {
    fields: {
      owns: {
        merge: false,
      },
      participatesIn: {
        merge: false,
      },
    },
  },
  Team: {
    fields: {
      boards: {
        merge: false,
      },
      participants: {
        merge: false,
      },
      flairs: {
        merge: false,
      },
    },
  },
  List: {
    fields: {
      cards: {
        merge: false,
      },
    },
  },
  Board: {
    fields: {
      lists: {
        merge: false,
      },
    },
  },
  Card: {
    fields: {
      flairs: {
        merge: false,
      },
    },
  },
}

export default typePolicies
