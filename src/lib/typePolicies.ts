import { TypePolicies } from "@apollo/client"

const acceptIncoming = (existing: any, incoming: any) => {
  return incoming
}

const typePolicies: TypePolicies = {
  User: {
    fields: {
      owns: {
        merge: acceptIncoming,
      },
    },
  },
  Team: {
    fields: {
      boards: {
        merge: acceptIncoming,
      },
      participants: {
        merge: acceptIncoming,
      },
    },
  },
  List: {
    fields: {
      cards: {
        merge: acceptIncoming,
      },
    },
  },
  Board: {
    fields: {
      lists: {
        merge: acceptIncoming,
      },
    },
  },
}

export default typePolicies
