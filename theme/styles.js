import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
  },
  row: {
    flex: 1,
    padding: 10,
    marginLeft: "5%",
    flexDirection: "row",
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  name: {
    flex: 1,
    marginRight: 10,
    fontWeight: "bold",
  },
  city: {
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: "50%",
    alignSelf: "center",
    textAlign: "center", 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default styles;
