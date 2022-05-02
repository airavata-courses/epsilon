try:
    verifiy_user(admin_user_name, admin_password)
    print("Successfully verified user")
except Exception as e:
    print("verifiy_user is not defined or user may not be created  in the teanant" + str(e))

    try:
    register_users(users)
except Exception:
    print("please defined method register_users")


try:
    create_groups(groups)
except Exception as e:
    print(e)
    print("please defined method create_groups")
try:
    allocate_users_to_groups(user_group_mapping)
except Exception:
    print("please defined method allocate_users_to_groups")


try:
    allocate_child_group_to_parent_group(child_gr_parent_gr_mapping)
except Exception:
    print("please defined method allocate_child_group_to_parent_group")


try:
    create_permissions(permissions)
except Exception:
    print("please defined method create_permissions")

try:
    create_entity_types(entity_types)
except Exception:
    print("please defined method create_entity_types")

try:
    register_resources(resources)
except Exception as e:
    print("Please defined method register_resources")

try:
    share_resource_with_group(gr_sharings)
except Exception as e:
    print("please defined method share_resource_with_group")

try:
    share_resource_with_user(sharings)
except Exception as e:
    print("Please defined method share_resource_with_user")


try:
    check_user_permissions(users)
except Exception as e:
    print(e)
    print("please defined methos check_user_permissions")


value = get_SSH_key(token)
print(value)
