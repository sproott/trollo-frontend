const typePolicies = {
  User: {
    fields: {
      owns: {
        merge(existing: any, incoming: any) {
          return incoming
        },
      },
    },
  },
  Team: {
    fields: {
      boards: {
        merge(existing: any, incoming: any) {
          return incoming
        },
      },
      participants: {
        merge(existing: any, incoming: any) {
          return incoming
        },
      },
    },
  },
  List: {
    fields: {
      cards: {
        merge(existing: any, incoming: any) {
          return incoming
        },
      },
    },
  },
}

export default typePolicies
