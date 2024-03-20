import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index} // Add this line
          onPress={() => {
            onChange(index);
          }}
          style={{
            padding: 19,
            backgroundColor: selections[index] ? '#EE9972' : '#495E57',
            borderWidth: 1,
            borderColor: 'white',
            height: 60,
          }}>
          <View>
            <Text style={{ color: selections[index] ? 'black' : 'white' }}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    height: 60,
  },
});

export default Filters;