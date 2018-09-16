import React from 'react';




const TodoList = (props) => {
    const { todos,edit,deleteList } = props;

    return (
        <div>

            <ul className='listStyle'>
                {todos.map((list, index) => {
                    return (
                        <li key={index + list.title}>
                            {list.completed ?
                                <span className='completed'>
                                    {list.title}-{list.description}
                                </span>

                                :

                                <span className=''>
                                    {list.title}-{list.description}
                                </span>


                            }
                            <span className="delete" >
                                {list.completed ?
                                    <i className="fa fa-check-square-o actionButton edit1" onClick={() => edit(index)}></i>

                                    :

                                    <i className="fa fa-square-o actionButton edit1" onClick={() => edit(index)}></i>
                                }

                                <i className="fa fa-remove actionButton delete1" onClick={() => deleteList(index)} ></i>
                            </span>
                            <hr />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default TodoList;