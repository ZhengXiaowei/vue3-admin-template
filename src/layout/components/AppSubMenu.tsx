import { defineComponent, withModifiers } from "vue";
import { useRouter } from "vue-router";

import { pathResolve } from "@/helper";

const AppSubMenu = defineComponent({
  name: "AppSubMenu",
  props: {
    menus: {
      type: Object,
      default: () => [],
    },
    parentPath: String,
  },
  setup(props) {
    const router = useRouter();

    const formatRoutes = (path: string, base: string = "/") =>
      pathResolve(path, base);

    const onNavigate = (to: string) => router.push(to);

    const renderSelf = () => {
      return props.menus.children.map((child: any) => {
        if (child.children && child.children.length) {
          return (
            <AppSubMenu
              menus={child}
              parent-path={formatRoutes(child.path, props.parentPath)}
              key={formatRoutes(child.path, props.parentPath)}
            />
          );
        } else {
          return (
            <a-menu-item key={formatRoutes(child.path, props.parentPath)}>
              <p
                onClick={withModifiers(
                  () => onNavigate(formatRoutes(child.path, props.parentPath)),
                  ["stop"]
                )}
              >
                {child.meta.title}
              </p>
            </a-menu-item>
          );
        }
      });
    };

    return () => (
      <a-sub-menu
        class="nav-item"
        key={props.menus.path}
        title={props.menus.meta.title}
      >
        {renderSelf()}
      </a-sub-menu>
    );
  },
});

export default AppSubMenu;
