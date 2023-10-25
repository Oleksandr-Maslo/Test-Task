import { useEffect, useMemo } from "react";
import { fetchTable, patchUserData } from "../../api/fetchUserData";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUsers } from "../../features/usersReducer";
import { User } from "../../types/User";
import { SortType } from "../../types/SortType";
import './table.scss';
import { setSortType } from "../../features/sortTypeReducer";
import { setEditableCell, setEditableId } from "../../features/editableIdReducer";
import { setNewValue } from "../../features/newValueReducer";
import { TablePagination } from "../TablePagination/TablePagination";
import { setTotalItems } from "../../features/tableDataReducer";

export const Table: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector<User[]>(state => state.users.users);
  const sortType = useAppSelector<SortType>(state => state.sortType.sortType);
  const { editableId, editableCell } = useAppSelector(state => state.editable);
  const { tablePage, totalItems} = useAppSelector(state => state.tableData);


  useEffect(() => {
     fetchTable(tablePage).then((res) => {
      dispatch(setUsers(res.results));
      dispatch(setTotalItems(res.count));
    })
  }, [tablePage]);

  const sortTable = (type: SortType) => {
    switch (type) {
      case SortType.NAME:
        return [...users].sort((a, b) => a.name.localeCompare(b.name));
      case SortType.BORN:
        return [...users].sort((a, b) => {
          const yearA = Number(a.birthday_date.split("-")[2]);
          const yearB = Number(b.birthday_date.split("-")[2]);

          if (yearA < yearB) return -1;
          if (yearA > yearB) return 1;
            return 0;
        });
      case SortType.EMAIL:
        return [...users].sort((a, b) => a.email.localeCompare(b.email));
      case SortType.PHONE:
        return [...users].sort((a, b) => a.phone_number.localeCompare(b.phone_number));
      case SortType.ADDRESS:
        return [...users].sort((a, b) => a.address.localeCompare(b.address));
      case SortType.NONE:
      default:
        return users;
    }
  };

  const sortedUsers: User[] = useMemo(() => {
    return sortTable(sortType);
  }, [sortType, users]);

  const handleEditableCell = (
    id: number | null,
    value: string | null,
  ) => {
    dispatch(setEditableId(id));
    dispatch(setEditableCell(value));
  };

  const validateCell = (key: string, newValue: string) => {
    switch (key) {
      case 'name': {
        const nameRegex = /^[A-Za-z0-9\s]{2,20}( [A-Za-z0-9\s]{2,20})?$/;

        return nameRegex.test(newValue);
      }

      case 'birthday_date': {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        return dateRegex.test(newValue);
      }

      case 'email': {
        const emailRegex = /\S+@\S+\.\S+/;

        return emailRegex.test(newValue)
      }

      case 'phone_number' : {
        const phoneRegex = /^\+\d{12}$/;

        return phoneRegex.test(newValue);
      }

      case 'address' : {
        return newValue.length > 5;
      }
    }

    return false;
  }

  const changeCellValue = (id: number, key: string, newValue: string) => {
    if (validateCell(key, newValue.trim())) {
      const newUsers = users.map((user) => {
        if (user.id === id) {
          patchUserData(id, key, newValue);

          return {
            ...user,
            [key]: newValue,
          }
        }
        return user;
      });
      
      dispatch(setUsers(newUsers));
    }
  };

  return (
    <div className="container">
      <table className="table">
      <thead>
        <tr>
          <th onClick={() => dispatch(setSortType(SortType.NAME))}>
            Name
          </th>

          <th onClick={() => dispatch(setSortType(SortType.BORN))}>
            Date of born
          </th>

          <th onClick={() => dispatch(setSortType(SortType.EMAIL))}>
            Email
          </th>

          <th onClick={() => dispatch(setSortType(SortType.PHONE))}>
            Phone number
          </th>

          <th onClick={() => dispatch(setSortType(SortType.ADDRESS))}>
            Adress
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            {editableId === user.id && editableCell === "name"
            ? (
              <input
                className="table__input"
                type="text"
                onBlur={(e) => {
                  handleEditableCell(null, null);
                  changeCellValue(user.id, 'name', e.target.value)
                }}
                autoFocus
                defaultValue={user.name}
                onChange={(e) => dispatch(setNewValue(e.target.value))}
              />
            ) : (
              <td
                data-cell-id="name"
                onDoubleClick={(e) => (
                  handleEditableCell(
                    user.id,
                    e.currentTarget.getAttribute("data-cell-id")
                  ))
                }
              >
                  {user.name}
              </td>
            )}

            {editableId === user.id && editableCell === "birthday_date"
            ? (
              <input
                className="table__input"
                type="text"
                onBlur={(e) => {
                  handleEditableCell(null, null);
                  changeCellValue(user.id, 'birthday_date', "2022-12-12")
                }}
                autoFocus
                defaultValue={user.birthday_date}
              />
            ) : (
              <td
                data-cell-id="birthday_date"
                onDoubleClick={(e) => (
                  handleEditableCell(
                    user.id,
                    e.currentTarget.getAttribute("data-cell-id")
                  ))
                }
              >
                  {user.birthday_date}
              </td>
            )}

            {editableId === user.id && editableCell === "email"
            ? (
              <input
                className="table__input"
                type="email"
                onBlur={(e) => {
                  handleEditableCell(null, null);
                  changeCellValue(user.id, 'email', e.target.value)
                }}
                autoFocus
                defaultValue={user.email}
              />
            ) : (
              <td
                data-cell-id="email"
                onDoubleClick={(e) => (
                  handleEditableCell(
                    user.id,
                    e.currentTarget.getAttribute("data-cell-id")
                  ))
                }
              >
                  {user.email}
              </td>
            )}
            
            {editableId === user.id && editableCell === "phone"
            ? (
              <input
                className="table__input"
                type="tel"
                onBlur={(e) => {
                  handleEditableCell(null, null);
                  changeCellValue(user.id, 'phone_number', e.target.value)
                }}
                autoFocus
                defaultValue={user.phone_number}
              />
            ) : (
              <td
                data-cell-id="phone"
                onDoubleClick={(e) => (
                  handleEditableCell(
                    user.id,
                    e.currentTarget.getAttribute("data-cell-id")
                  ))
                }
              >
                  {user.phone_number}
              </td>
            )}

            {editableId === user.id && editableCell === "address"
            ? (
              <input
                className="table__input"
                type="text"
                onBlur={(e) => {
                  handleEditableCell(null, null);
                  changeCellValue(user.id, 'address', e.target.value)
                }}
                autoFocus
                defaultValue={user.address}
              />
            ) : (
              <td
                data-cell-id="address"
                onDoubleClick={(e) => (
                  handleEditableCell(
                    user.id,
                    e.currentTarget.getAttribute("data-cell-id")
                  ))
                }
              >
                  {user.address}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    <TablePagination />
    </div>
  );
};