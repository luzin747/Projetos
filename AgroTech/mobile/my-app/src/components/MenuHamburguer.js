import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 10,
  },
  menuItem: {
    padding: 10,
  },
});

const HamburgerMenu = () => {
  return (
    <Menu style={styles.menu}>
      <MenuTrigger>
        <TouchableOpacity>
          <Text>Menu</Text>
        </TouchableOpacity>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption style={styles.menuItem}>
          <TouchableOpacity>
            <Text>Opção 1</Text>
          </TouchableOpacity>
        </MenuOption>
        <MenuOption style={styles.menuItem}>
          <TouchableOpacity>
            <Text>Opção 2</Text>
          </TouchableOpacity>
        </MenuOption>
        <MenuOption style={styles.menuItem}>
          <TouchableOpacity>
            <Text>Opção 3</Text>
          </TouchableOpacity>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default HamburgerMenu;
