import * as React from 'react';
import {View, StyleSheet, Text, ViewStyle, TextStyle} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import {TextStl, theme} from '../Constants/Style';

const styles = StyleSheet.create({
  sameRow: {flexDirection: 'row'},
  tableHeader: {
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: theme.primary,
  },
  textHeader: [TextStl.base, {color: 'black', fontWeight: 'bold'}] as TextStyle,
  dataContainer: {
    backgroundColor: theme.lightGrey,
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
  },
});

function DatabaseTable({data, setIsPreview, setPreview}: any) {
  const width = ['5%', '30%', '45%', '20%'];
  const widthStyle = width.map(item => ({width: item} as ViewStyle));
  return (
    <View>
      {/* Header */}
      <View style={styles.sameRow}>
        <View style={[styles.tableHeader, widthStyle[0]]}>
          <Text style={styles.textHeader}>ID</Text>
        </View>
        <View style={[styles.tableHeader, widthStyle[1]]}>
          <Text style={styles.textHeader}>Image</Text>
        </View>
        <View style={[styles.tableHeader, widthStyle[2]]}>
          <Text style={styles.textHeader}>Caption</Text>
        </View>
        <View style={[styles.tableHeader, widthStyle[3]]}>
          <Text style={styles.textHeader}>Preview</Text>
        </View>
      </View>
      {/* Data */}
      {data.map((item: any, index: number) => (
        <View key={index} style={styles.sameRow}>
          <View style={[widthStyle[0], styles.dataContainer]}>
            <Text style={TextStl.base}>{index + 1}</Text>
          </View>
          <View style={[widthStyle[1], styles.dataContainer]}>
            <Text style={TextStl.base}>{item.title}</Text>
          </View>
          <View style={[widthStyle[2], styles.dataContainer]}>
            <Text style={TextStl.base}>{item.annotation}</Text>
          </View>
          <View style={[widthStyle[3], styles.dataContainer]}>
            <Icons
              name="search-circle"
              size={30}
              color="black"
              onPress={() => {
                setIsPreview(true);
                setPreview(item);
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

export default DatabaseTable;
