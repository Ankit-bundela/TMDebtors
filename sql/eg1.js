SQL> describe ac_item;
 Name                                      Null?    Type
 ----------------------------------------- -------- ----------------------------
 CODE                                      NOT NULL NUMBER(38)
 NAME                                               CHAR(25)

SQL> describe ac_uom;
 Name                                      Null?    Type
 ----------------------------------------- -------- ----------------------------
 CODE                                      NOT NULL NUMBER(38)
 NAME                                      NOT NULL CHAR(5)

SQL> describe ac_item_tax;
 Name                                      Null?    Type
 ----------------------------------------- -------- ----------------------------
 ITEM_CODE                                 NOT NULL NUMBER(38)
 CGST                                      NOT NULL NUMBER(6,2)
 SGST                                      NOT NULL NUMBER(6,2)
 IGST                                      NOT NULL NUMBER(6,2)

SQL> describe ac_state;
 Name                                      Null?    Type
 ----------------------------------------- -------- ----------------------------
 CODE                                      NOT NULL NUMBER(38)
 NAME                                      NOT NULL CHAR(50)
 ALPHA_CODE                                NOT NULL CHAR(2)

SQL> describe ac_customer;
 Name                                      Null?    Type
 ----------------------------------------- -------- ----------------------------
 CODE                                      NOT NULL NUMBER(38)
 NAME                                      NOT NULL CHAR(150)
 ADDRESS                                   NOT NULL VARCHAR2(500)
 REG_TITLE_1                                        CHAR(50)
 REG_VALUE_1                                        CHAR(50)
 REG_TITLE_2                                        CHAR(50)
 REG_VALUE_2                                        CHAR(50)
 REG_TITLE_3                                        CHAR(50)
 REG_VALUE_3                                        CHAR(50)
 CONTACT_1                                          CHAR(20)
 CONTACT_2                                          CHAR(20)
 CONTACT_3                                          CHAR(20)
 STATE_CODE                                NOT NULL NUMBER(38)

SQL> describe ac_trader;
 Name                                      Null?    Type
 ----------------------------------------- -------- ----------------------------
 CODE                                      NOT NULL NUMBER(38)
 NAME                                      NOT NULL CHAR(150)
 ADDRESS                                   NOT NULL VARCHAR2(500)
 GST_NUM                                   NOT NULL CHAR(20)
 REG_TITLE_1                                        CHAR(50)
 REG_VALUE_1                                        CHAR(50)
 REG_TITLE_2                                        CHAR(50)
 REG_VALUE_2                                        CHAR(50)
 REG_TITLE_3                                        CHAR(50)
 REG_VALUE_3                                        CHAR(50)
 CONTACT_1                                          CHAR(20)
 CONTACT_2                                          CHAR(20)
 CONTACT_3                                          CHAR(30)
 STATE_CODE                                NOT NULL NUMBER(38)

SQL> ALTER TABLE ac_item ADD HSN_CODE CHAR(10);

Table altered.

SQL> describe ac_item;