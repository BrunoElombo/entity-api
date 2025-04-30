import { AbilityBuilder, createPrismaAbility } from '@casl/prisma';
import { jwtDecode } from "jwt-decode";

export const defineAbilitiesForBanks = async (token) => {
  try {
    const { can, build } = new AbilityBuilder(createPrismaAbility);
    
    
    //   Get the roles, permissions from the token
    let decodedToken = jwtDecode(token);
    let isSuperAdmin = decodedToken?.user.isSuperAdmin;
    let userRoles = decodedToken?.user.roles;
    let permissions = decodedToken?.user?.permissions;
    
    //   Set accessibility rules
    
    if (permissions.incluse("can_read_all_banks")) {
      can('read', 'Bank');
    }
    else if (permissions.incluse("can_read_own_banks")) {
      can('read', 'Bank');
    }
    //   return build
    return build();
    
  } catch (error) {
    console.error(error);
  }
}
// can('manage', 'Post', { authorId: user.id });
// cannot('read', 'Post', { title: { startsWith: '[WIP]:' } });

